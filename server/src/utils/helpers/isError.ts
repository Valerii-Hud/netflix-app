import chalk from 'chalk';

interface ErrorHandler {
  error: unknown;
  functionName: string;
  handler: 'controller' | 'lib' | 'route' | 'db' | 'middleware';
}

const isError = ({ error, functionName, handler }: ErrorHandler) => {
  const isRegularError = error instanceof Error;
  if (isRegularError) {
    console.log(
      chalk.bgRed(`Error on ${functionName} ${handler}: ${error.message}`)
    );
  }
  return isRegularError;
};
export default isError;
