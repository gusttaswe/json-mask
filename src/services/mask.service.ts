import { Mask } from "domains/mask.domain";
import { MaskServiceType } from "./mask.types";

export class MaskService implements MaskServiceType {
  private maskOptions: Mask;

  constructor(maskOptions: Mask) {
    this.maskOptions = maskOptions;
  }
  
  hideString(str: string): string {  
    return this.maskOptions.replacementChar.repeat(this.maskOptions.charLimit || str.length);
  }
  
  isInBlackList(str: string): boolean {
    return this.maskOptions.blackList.includes(str.toLowerCase())
  }

}