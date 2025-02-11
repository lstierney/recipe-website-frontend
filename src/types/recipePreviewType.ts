export interface RecipePreviewType {
    id?: number,
    name: string,
    description: string,
    cooked: number,
    lastCooked?: string,
    imageFolderPath: string,
    imageFileNames: string[]
}