import type { CartRepository } from "../domain/CartRepository";

export class AddToCartUseCase {

  constructor(
    private readonly repository: CartRepository
  ) {}


  execute(
    id: string,
    colorCode: number,
    storageCode: number
  ) {
    return this.repository.addProduct(
      id,
      colorCode,
      storageCode
    );
  }
}