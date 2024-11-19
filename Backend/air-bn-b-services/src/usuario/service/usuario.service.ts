import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDTO } from '../DTO/create-usuario-dto';
import { ResponseUsuarioDTO } from '../DTO/response-usuario-dto';

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService){}

    async usuarioByUserNameAndPassword(UserName:string,Password:string):Promise<ResponseUsuarioDTO|null>{
        const user = await this.prisma.usuarios.findFirst({
            where:{
                UserName:UserName,
                Password:Password,
            },
        })
        if(!user){
            return null;
        }
        return{
            ...user
        }
    }

    async usuarioByUserName(UserName:string):Promise<ResponseUsuarioDTO>{
        const user = await this.prisma.usuarios.findFirst({
            where : {
                UserName : UserName,
            },
        });
        return user;
    }

    async createUsuario(data:CreateUsuarioDTO):Promise<ResponseUsuarioDTO>{
        return this.prisma.usuarios.create({data});
    }

    async eliminarUsuario(UserName: string, Password: string): Promise<ResponseUsuarioDTO> {
        // Buscar el usuario por UserName
    const user = await this.prisma.usuarios.findUnique({
        where: {
            UserName: UserName,
        },
    });
    // Verificar si el usuario existe
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar si la contraseña es correcta
    if (user.Password !== Password) {
        throw new Error('Contraseña incorrecta');
    }
    // Eliminar el usuario
    await this.prisma.usuarios.delete({
        where: {
            UserName: UserName, // O puedes usar 'id' si es más apropiado
        },
    });
    // Devolver los datos del usuario eliminado, si lo deseas
    return {
        ...user, // Puedes devolver el usuario eliminado si es necesario
    };
    }
    
}
