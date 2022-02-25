import MaskData from 'maskdata'

const defaulFieldsToMask = [
  'cnpj',
  'cpf',
  'phone',
  'email',
  'firebase_id'
]

const maskJSONOptions: any = {
  // Character to mask the data. Default value is '*'
  maskWith: '*',
  fields: []
}

class Mask {
  /**
   * It will map every object and sub-object and
   * find the keys that must be masked.
   *
   * @param {object} obj - Object to be masked
   * @param {string} parentFieldName - used as reference to find fields in object
   * @param {array} fieldsToMask - Array of names that will be used to mask the object
   * @returns {array} fields - array of fields found to be masked.
   * @example
   *
   * lets say we have the following object input:
   *  {
   *    email: 'xxxxxxxx@xxxxxx.xxx'
   *    person: {
   *      cpf: 'xxxxxxxxxxxx'
   *    },
   *    company: {
   *      cnpj: 'xxxxxxxxxxxxxxxxx'
   *    }
   *  }
   *
   * it'll return the following output
   * ['email', 'person.cpf', 'company.cnpj']
   */
  private findFieldsToMask (
    obj: any,
    fieldsToMask: string[],
    parentFieldName: string = ''
  ) {
    for (const key of Object.keys(obj)) {
      const property = obj[key]

      if (!property) continue

      if (Array.isArray(property)) {
        // TODO: create regex to find fields to mask...
        continue
      }

      if (typeof property === 'object') {
        const parsedKey = parentFieldName ? `${parentFieldName}.${key}` : key
        const newFields: string[] = fieldsToMask.map(field => `${parsedKey}.${field}`)
        maskJSONOptions.fields = maskJSONOptions.fields.concat(newFields)
        this.findFieldsToMask(property, fieldsToMask, parsedKey)
      }
    }
  }

  /**
   * Mask sensitive items from an object.
   * Uses MaskData library in background.
   * @Ref (https://www.npmjs.com/package/maskdata)
   * @param {object} jsonObject - Object to be masked
   * @param {array} fieldsToMask - Array of names that will be used to mask the object
   * @returns jsonObject with fields masked
   *
   * @example
   *  //jsonObject
   *  {
   *    email: 'lalala@hotmail.com'
   *    person: {
   *      cpf: '44455566677'
   *    },
   *    company: {
   *      cnpj: '89.077.176/0001-55'
   *    }
   *  }
   *
   *  //fieldsToMask
   *  ['email', 'cpf', 'cnpj']
   *
   *  //Output
   *  {
   *    email: 'xxxxxxxxxxxxxxxxxxx'
   *    person: {
   *      cpf: 'xxxxxxxxxxxx'
   *    },
   *    company: {
   *      cnpj: 'xxxxxxxxxxxxxxxxx'
   *    }
   *  }
   */
  public maskJSON (jsonObject: any, fieldsToMask: string[] = defaulFieldsToMask) {
    // if is not an object, return itself..
    if (typeof jsonObject !== 'object') return jsonObject

    // if object is not an array, mask return the object masked...
    if (!Array.isArray(jsonObject)) {
      this.findFieldsToMask(jsonObject, fieldsToMask)
      maskJSONOptions.fields = maskJSONOptions.fields.concat(fieldsToMask)
      return MaskData.maskJSONFields(jsonObject, maskJSONOptions)
    }

    // if object is an array, map through it mapping the objects...
    return jsonObject.map(obj => {
      if (typeof obj !== 'object') return obj

      this.findFieldsToMask(obj, fieldsToMask)
      maskJSONOptions.fields = maskJSONOptions.fields.concat(fieldsToMask)
      return MaskData.maskJSONFields(obj, maskJSONOptions)
    })
  }
}

export default new Mask()