import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GeneralException } from 'src/modules/utility/exceptions/general.exception';
import { ErrorTypeEnum } from 'src/modules/utility/enums/error-type.enum';
import { JwtAuthGuard } from 'src/modules/authentication/guard/jwt-auth.guard';
import { verifyProofDto } from '../dto/contract-dto';
import { ContractService } from '../services/contract.service';
import { UserService } from 'src/modules/user/services/user/user.service';

@ApiTags('Smart Contract')
@Controller('app/v1/contract')
export class contractController {
  constructor(
    private readonly contractService?: ContractService,
    private readonly userService?: UserService,
  ) {
    setTimeout(() => {
      this.contractService.syncAllServices();
      this.contractService.syncAllDevices();
    }, 4000);
  }

  @Post('/verify-zkp')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Verifying the proof.',
    description: 'This api verifies then user proof code.',
  })
  async verifyProof(@Body() body: verifyProofDto, @Request() request) {
    console.log('We are in Verify Proof section', body);

    if (body.proof === null || body.proof === undefined || body.proof === '') {
      let errorMessage = 'proof is not valid!';
      throw new GeneralException(
        ErrorTypeEnum.UNPROCESSABLE_ENTITY,
        errorMessage,
      );
    }

    return this.contractService.zpkProof(body.proof);
  }

  @Get('/get-wallet-balance')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Balance of wallet.',
    description: 'This api returns balance of entered wallet.',
  })
  async getWalletBalance(@Request() request) {
    const userRes = await this.userService.getUserProfileByIdFromUser(
      request.user.userId || '',
    );

    const walletAddress = userRes.walletAddress || '';

    if (
      walletAddress === null ||
      walletAddress === undefined ||
      walletAddress === ''
    ) {
      let errorMessage = 'walletAddress is not valid!';
      throw new GeneralException(
        ErrorTypeEnum.UNPROCESSABLE_ENTITY,
        errorMessage,
      );
    }

    return this.contractService.getWalletBalance(walletAddress);
  }

  @Get('/admin-wallet')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin wallet address.',
    description: 'This api returns wallet address of admin.',
  })
  async adminWalletAddress() {
    return this.contractService.adminWalletData();
  }

  @Get('/faucet-wallet')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Faucet wallet address.',
    description: 'This api returns wallet address of faucet account.',
  })
  async faucetWalletAddress() {
    return this.contractService.faucetWalletData();
  }

  @Post('/request-faucet')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Requesting faucet.',
    description:
      'This api give some faucet to user wallet address entered in website.',
  })
  async requestFaucet(@Request() request) {
    const userRes = await this.userService.getUserProfileByIdFromUser(
      request.user.userId || '',
    );

    const walletAddress = userRes.walletAddress || '';

    if (
      walletAddress === null ||
      walletAddress === undefined ||
      walletAddress === ''
    ) {
      let errorMessage = 'walletAddress is not valid!';
      throw new GeneralException(
        ErrorTypeEnum.UNPROCESSABLE_ENTITY,
        errorMessage,
      );
    }

    return this.contractService.requestFaucet(walletAddress);
  }

  @Get('/search-data')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Searching data by string.',
    description:
      'This api return a search result between smart contract data by giving string.',
  })
  async searchInSmartContracts(@Query('search') search: string) {
    return await this.contractService.searchData(search);
  }

  @Get('/get-contract-data')
  @HttpCode(201)
  async getData(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    const records = await this.contractService.getPaginatedRecords(
      Number(limit),
      Number(offset),
    );
    return records;
  }

  /* @Get('/fetch-service')
  @HttpCode(201)
  @ApiOperation({
    summary: '',
    description: '',
  })
  async fetchService() {
    return this.contractService.fetchAllServices();
  }

  @Post('/remove-service')
  @HttpCode(201)
  @ApiOperation({
    summary: '',
    description: '',
  })
  async removeService(@Body() body: removeServiceDto) {
    return this.contractService.removeService(body.nodeId, body.serviceId)
  }

  @Get('/fetch-device')
  @HttpCode(201)
  @ApiOperation({
    summary: '',
    description: '',
  })
  async fetchDevice() {
    return this.contractService.fetchAllDevices();
  }

  @Post('/remove-device')
  @HttpCode(201)
  @ApiOperation({
    summary: '',
    description: '',
  })
  async removeDevice(@Body() body: removeDeviceDto) {
    return this.contractService.removeSharedDevice(body.nodeId, body.deviceId)
  } */
}
