export interface CartRepository {
  addProduct(
    id: string,
    colorCode: number,
    storageCode: number
  ): Promise<number>;
}