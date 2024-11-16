import { IsNotEmpty, IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class UpdateUserProfileDto {

    @IsNotEmpty()
    @IsString()
    names: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    profileImage: string;
}