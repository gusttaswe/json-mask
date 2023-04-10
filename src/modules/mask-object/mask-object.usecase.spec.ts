import { MaskService } from "services/mask.service";
import { MaskObjectUseCase } from "./mask-object.usecase";
import { Mask } from "domains/mask.domain";

describe('MaskObject', () => {
  let maskObjectUseCase: MaskObjectUseCase;
  let maskService: MaskService;
  let maskOptions: Mask;

  beforeEach(() => {
    maskOptions = {
      blackList: [],
      replacementChar: '*',
    }

    maskService = new MaskService(maskOptions);
    maskObjectUseCase = new MaskObjectUseCase(maskService);
  })


  it('Should mask Name and Document correctly', () => {
    const objectToMask: any = {
      name: 'Gustavo Mata',
      document: '111.222.333-05',
      phone: '12 12341234'
    };

    const maskedObject = maskObjectUseCase.execute(objectToMask)
    expect(maskedObject).toHaveProperty('document', '')
  })
}) 