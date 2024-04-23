import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiResponse,
  AuthUser,
  Code,
  JwtAuthGuard,
  UserPayload,
} from '@app/common';

import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketDto } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('/api/v1/tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  public async createTicket(
    @AuthUser() user: UserPayload,
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<ApiResponse<TicketDto>> {
    const ticketDto = await this.ticketService.create(user, createTicketDto);

    return ApiResponse.handleSuccess(
      Code.CREATED.code,
      Code.CREATED.message,
      ticketDto,
    );
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async getTicket(@Param() id: number): Promise<ApiResponse<TicketDto>> {
    const ticketDto = await this.ticketService.findOne(id);

    return ApiResponse.handleSuccess(Code.OK.code, Code.OK.message, ticketDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getTickets(): Promise<ApiResponse<TicketDto[]>> {
    const ticketDtos = await this.ticketService.findAll();

    return ApiResponse.handleSuccess(Code.OK.code, Code.OK.message, ticketDtos);
  }

  @Put(':/id')
  @HttpCode(HttpStatus.OK)
  public async updateTicket(
    @Param() id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<ApiResponse<TicketDto>> {
    const ticketDto = await this.ticketService.update(id, updateTicketDto);

    return ApiResponse.handleSuccess(
      Code.CREATED.code,
      Code.CREATED.message,
      ticketDto,
    );
  }
}
