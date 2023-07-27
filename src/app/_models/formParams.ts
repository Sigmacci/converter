export class FormParams {
    codeFrom = 'USD';
    codeTo = 'PLN';
    money = 1.0;

    constructor(_codeFrom: string, _codeTo: string, _money: number) {
        this.codeFrom = _codeFrom;
        this.codeTo = _codeTo;
        this.money = _money;
    }
}