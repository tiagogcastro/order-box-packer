import { ProductRepository } from '@/modules/products/repositories/products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsSeed {
  constructor(private readonly productsRepository: ProductRepository) { }

  async run() {
    try {
      const count = await this.productsRepository.count();

      if (count === 0) {
        const seedProducts = [
          { name: "PS5", height: 40, width: 10, length: 25 },
          { name: "Volante", height: 40, width: 30, length: 30 },
          { name: "Joystick", height: 15, width: 20, length: 10 },
          { name: "Fifa 24", height: 10, width: 30, length: 10 },
          { name: "Call of Duty", height: 30, width: 15, length: 10 },
          { name: "Headset", height: 25, width: 15, length: 20 },
          { name: "Mouse Gamer", height: 5, width: 8, length: 12 },
          { name: "Teclado Mecânico", height: 4, width: 45, length: 15 },
          { name: "Cadeira Gamer", height: 120, width: 60, length: 70 },
          { name: "Webcam", height: 7, width: 10, length: 5 },
          { name: "Microfone", height: 25, width: 10, length: 10 },
          { name: "Monitor", height: 50, width: 60, length: 20 },
          { name: "Notebook", height: 2, width: 35, length: 25 },
          { name: "Jogo de Cabos", height: 5, width: 15, length: 10 },
          { name: "Controle Xbox", height: 10, width: 15, length: 10 },
          { name: "Carregador", height: 3, width: 8, length: 8 },
          { name: "Tablet", height: 1, width: 25, length: 17 },
          { name: "HD Externo", height: 2, width: 8, length: 12 },
          { name: "Pendrive", height: 1, width: 2, length: 5 }
        ];

        const products = seedProducts.map(productData =>
          this.productsRepository.create(productData)
        );

        await Promise.all(products);

        console.log(`Seeded ${products.length} products`);
      }
    } catch (error) {
      console.error('Erro no seed de products:', error);
    }
  }
}
