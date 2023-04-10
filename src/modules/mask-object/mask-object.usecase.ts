import { UseCase } from "@shared/usecase.config";
import { Result } from "neverthrow";
import { MaskService } from "services/mask.service";

export class MaskObjectUseCase implements UseCase {

  constructor (
    private maskService: MaskService
  ) {}

  public execute(dto: any): Result<any, null> {
    for (const key of Object.keys(dto)) {
      const property = dto[key];
      if (!property || Array.isArray(property)) continue;
      if (!this.maskService.isInBlackList(key)) continue;
      if (typeof property !== 'string') continue;

      dto[key] = this.maskService.hideString(property);
    }

    return dto;
  }
}