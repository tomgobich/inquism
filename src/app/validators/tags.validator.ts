import { AbstractControl, ValidatorFn } from '@angular/forms';

export class TagsValidator {

  private value: any;
  private spaceCount: number;
  private hashtagCount: number;
  private specialCharCount: number;
  private isValid: boolean;

  constructor() {}

  // Root call to check tags validity
  public checkIsValid() : ValidatorFn {
    return (c: AbstractControl) => {
      // load control value into this.value
      this.value = c.value;

      // Gather values needed to check validity
      this.spaceCount       = this.getSpaceCount();
      this.hashtagCount     = this.getHashtagCount();
      this.specialCharCount = this.getSpecialCharCount();

      // Check values validity
      this.isValid = this.getValidity();

      // Handle values validity response
      return this.isValid ?
        null :
        { tags: { valid: false }};
    }
  }



  // Calculates tags space count
  public getSpaceCount() {
    return this.value.trim().split(" ").length - 1;
  }



  // Calculates tags hashtag count
  public getHashtagCount() {
    return this.value.trim().split("#").length - 1;
  }



  // Calculates total number of special characters in value
  public getSpecialCharCount() {
    return (this.value.match(/[$&+,:;=?"@\-|'<>./:-@[-`{-~^*()%!]/g) || []).length || 0;
  }



  // Compares values against valid bounds, returns validity boolean
  public getValidity() {
    const MAX_SPACE_COUNT         = 2;    // 2 spaces in-between 3 words
    const MAX_HASHTAG_COUNT       = 3;    // 3 tags total
    const MAX_SPECIAL_CHAR_COUNT  = 0;    // Allow no special chars

    // Check values against valid bounds set in constants
    return this.spaceCount        <= MAX_SPACE_COUNT         &&
           this.hashtagCount      <= MAX_HASHTAG_COUNT       &&
           this.specialCharCount  <= MAX_SPECIAL_CHAR_COUNT  ?
            true : false;
  }

}