import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
constructor(private readonly repository: ProductRepository) {}

create(createProductDto: CreateProductDto) {
return this.repository.create(createProductDto);
}

findAll() {
return this.repository.findMany();
}

async findOne(id: string) {
const item = await this.repository.findUnique(id);
if (!item) throw new NotFoundException(`Product #${id} not found`);
return item;
}

update(id: string, updateProductDto: UpdateProductDto) {
return this.repository.update(id, updateProductDto);
}

remove(id: string) {
return this.repository.softDelete(id);
}
}