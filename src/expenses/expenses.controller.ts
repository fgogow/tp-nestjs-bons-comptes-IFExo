import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/guards/auth.guard.js';
import { ApiJwtAuth } from '../common/swagger/api-docs.decorators.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { ExpensesService } from './expenses.service.js';
import { ExpenseOwnerGuard } from './guards/expense-owner.guard.js';

@Controller('wallets/:walletId/expenses')
@ApiTags('expenses')
@UseGuards(JwtAuthGuard)
@ApiJwtAuth()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  findAll(
    @Param('walletId') walletId: string,
    @CurrentUser('userId') userId: string,
  ) {
    return this.expensesService.findAll(walletId, userId);
  }

  @Post()
  create(
    @Param('walletId') walletId: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expensesService.create(walletId, userId, dto);
  }

  @Delete(':id')
  @UseGuards(ExpenseOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('walletId') walletId: string, @Param('id') id: string) {
    return this.expensesService.remove(walletId, id);
  }
}
