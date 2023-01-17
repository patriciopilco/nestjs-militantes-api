import { IsMongoId,IsNotEmpty, IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';
import { ApiProperty, PartialType, OmitType  } from '@nestjs/swagger'

export class CreatePersonaDto {

    @ApiProperty()
    identificacion: string;

    @ApiProperty()
    nombres: string;

    @ApiProperty()
    apellidos: string;

    @ApiProperty()
    edad: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    telefono: string;
}

export class UpdatePersonaDto extends PartialType( OmitType(CreatePersonaDto, ['identificacion']),) {}

export class FilterPersonaDto {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    @Min(0)
    offset: number;

    @IsOptional()
    @Min(1)
    minEdad: number;

    @ValidateIf((params) => params.minEdad)
    @IsPositive()
    maxEdad: number;
}