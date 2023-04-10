
export class Mask {
  public readonly replacementChar: string;
  /**
   * Allow specifying the number of characters to replace
   * @example 
   *  // numChar: 5
   *  MaskService.hideString('Hello World') // '*****' 
   */
  public readonly charLimit?: number;
  /**
   * List of items to be masked. 
   */
  public readonly blackList: string[]

  constructor(options: Mask) {
    Object.assign(this, options);

    this.blackList = options.blackList.map(bl => bl.toLowerCase())
  }
}
