import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(10);
    expect(account.getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 10;
    const account = getBankAccount(balance);

    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 10;
    const account = getBankAccount(balance);
    const transferAccount = getBankAccount(0);

    expect(() => account.transfer(100, transferAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 10;
    const account = getBankAccount(balance);

    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = 10;
    const account = getBankAccount(balance);

    account.deposit(100);

    expect(account.getBalance()).toBe(110);
  });

  test('should withdraw money', () => {
    const balance = 10;
    const account = getBankAccount(balance);

    account.withdraw(2);

    expect(account.getBalance()).toBe(8);
  });

  test('should transfer money', () => {
    const balance = 10;
    const myAccount = getBankAccount(balance);
    const transferAccount = getBankAccount(0);

    myAccount.transfer(2, transferAccount);

    expect(myAccount.getBalance()).toBe(8);
    expect(transferAccount.getBalance()).toBe(2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 10;
    const account = getBankAccount(balance);

    try {
      const newBalance = await account.fetchBalance();

      if (newBalance == null) {
        throw new SynchronizationFailedError();
      }

      expect(newBalance).toEqual(expect.any(Number));

    } catch (err) {
      expect(err).toEqual(new SynchronizationFailedError());
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 10;
    const account = getBankAccount(balance);
    const newBalance = 12;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    try {
      await account.synchronizeBalance();
      expect(account.getBalance()).toEqual(newBalance);

    } catch (err) {
      expect(err).toEqual(new SynchronizationFailedError());
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 10;
    const account = getBankAccount(balance);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    try {
      await account.synchronizeBalance();
    } catch (err) {
      expect(err).toEqual(new SynchronizationFailedError());
    }
  });
});
