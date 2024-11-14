export function errorHandler(error: any) {
    const errors = [];
                console.log(error.message);

                if (error.code === 11000) {
                    errors.push('That email is already in use');
                } else {
                    for (const prop in error.errors) {
                        errors.push(error.errors[prop].message);
                    }
                }

                return {
                    errors: errors
                };
}