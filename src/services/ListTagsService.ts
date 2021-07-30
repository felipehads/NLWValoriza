import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
//Cria novos objetos a partir dos objetos por padrão nas entidades, neste caso cria o nameCustom com base no nome do usuário dado
import { classToPlain } from "class-transformer"


class ListTagsService {

    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const tags = await tagsRepositories.find();

        return classToPlain(tags);
    }
}

export { ListTagsService }