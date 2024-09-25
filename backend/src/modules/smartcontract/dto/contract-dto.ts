import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class verifyProofDto {
  @IsNotEmpty({ message: 'proof is required and must be entered.' })
  @IsString({ message: 'proof must be string.' })
  @ApiProperty({ required: true })
  proof: string;
}

export class searchContractDto {
  @IsNotEmpty({ message: 'search is required and must be entered.' })
  @IsString({ message: 'search must be string.' })
  @ApiProperty({ required: true })
  search: string;
}

export class walletBalanceDto {
  @IsNotEmpty({ message: 'walletAddress is required and must be entered.' })
  @IsString({ message: 'walletAddress must be string.' })
  @ApiProperty({ required: true })
  walletAddress: string;
}


export class removeServiceDto {
  @IsNotEmpty({ message: 'proof is required and must be entered.' })
  @IsString({ message: 'proof must be string.' })
  @ApiProperty({ required: true })
  nodeId: string;

  @IsNotEmpty({ message: 'proof is required and must be entered.' })
  @IsString({ message: 'proof must be string.' })
  @ApiProperty({ required: true })
  serviceId: string;
}


export class removeDeviceDto {
  @IsNotEmpty({ message: 'proof is required and must be entered.' })
  @IsString({ message: 'proof must be string.' })
  @ApiProperty({ required: true })
  nodeId: string;

  @IsNotEmpty({ message: 'proof is required and must be entered.' })
  @IsString({ message: 'proof must be string.' })
  @ApiProperty({ required: true })
  deviceId: string;
}