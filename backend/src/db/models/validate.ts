interface IValidate {
    message: string
    details: string[]
    error: boolean
}

class Validate implements IValidate {
    message: string;
    details: string[];
    error: boolean;

    constructor(data: Validate) {
        this.message = data.message;
        this.details = data.details;
        this.error = data.error;
    }
}

export default Validate;