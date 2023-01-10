import { IsMongoId,IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType, OmitType  } from '@nestjs/swagger'

export class CreatePersonaDto {

    @ApiProperty()
    identificacion: string;

    @ApiProperty()
    nombres: string;

    @ApiProperty()
    apellidos: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    telefono: string;
}

export class UpdatePersonaDto extends PartialType( OmitType(CreatePersonaDto, ['identificacion']),) {}