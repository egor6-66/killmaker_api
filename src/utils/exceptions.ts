import { AuthenticationError, ValidationError } from '@nestjs/apollo';

class Exception {
    unauthorized() {
        throw new AuthenticationError('Unauthorized');
    }

    notUnique() {
        throw new ValidationError('Not unique');
    }

    minCount(count: number) {
        throw new ValidationError(`Min count: ${count}`);
    }

    maxCount(count: number) {
        throw new ValidationError(`Max count: ${count}`);
    }

    serverError() {
        throw new ValidationError('Server error');
    }
}

export default new Exception();
