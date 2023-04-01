import { UseCase } from "@shared/usecase.config";
import { Result } from "neverthrow";

export class MaskObjectUseCase 
	implements UseCase<any, any, any> {

		constructor () {}

		public execute(dto: any): Promise<Result<any, any>> {
			throw new Error("Method not implemented.");
		}
}