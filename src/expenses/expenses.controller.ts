import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../auth/authenticated-request.js';
import { JwtAuthGuard } from '../auth/guards/auth.guard.js';
import { ApiJwtAuth } from '../common/swagger/api-docs.decorators.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { ExpensesService } from './expenses.service.js';

@Controller('wallets/:walletId/expenses')
@ApiTags('expenses')
@UseGuards(JwtAuthGuard)
@ApiJwtAuth()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  findAll(
    @Param('walletId') walletId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.expensesService.findAll(walletId, req.user.userId);
  }

  @Post()
  create(
    @Param('walletId') walletId: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expensesService.create(walletId, req.user.userId, dto);
  }

  // TODO étape 3 : route DELETE ':id' protégée par ExpenseOwnerGuard (@UseGuards).
  //   Répondre 204 (@HttpCode(HttpStatus.NO_CONTENT)).
  //   Refactorisez aussi les routes précédentes pour utiliser @CurrentUser('userId')
  //   à la place de @Req().
}
