const { Transaction } = require('../index');

const privateKey = 'f24c11584fa87fd7ef72ecdfc364535667ada4b15a8da3ecce96dd1771cf482e';
const utxo = [
  {
    txOutIndex: 1,
    txOutId: '995e67599f5dabe1f45028e5dc78d8c97454bf570013a361b489ab6c764d74ff',
    amount: 999993,
    address: '03a9cfbd52dade39e77dd9e55a2e2cdd3a874646952c8d259b555d01f920f53cd3',
  }
];
const transactionToCompare = {
  type: 'regular',
  txIns: [
    {
      txOutIndex: 1,
      txOutId: '995e67599f5dabe1f45028e5dc78d8c97454bf570013a361b489ab6c764d74ff',
      amount: 999993,
      address: '03a9cfbd52dade39e77dd9e55a2e2cdd3a874646952c8d259b555d01f920f53cd3',
      signature: '463ea2741522e12404972d913f9cdc409c1065f24b76de05ed142c22388d98790306019f1751c27f3713ccb1fdd46e87d5be07662c123cb7245008befc45964a'
    }
  ],
  txOuts: [
    {
      address: '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
      amount: 1
    },
    {
      address: '03a9cfbd52dade39e77dd9e55a2e2cdd3a874646952c8d259b555d01f920f53cd3',
      amount: 999992
    }
  ],
  timestamp: 1562066421,
  id: 'b3746356d13537c0a27dd336fc74c00fdfb5aeede25658dcaf638230d489270b'
};

beforeAll(() => {
  jest.spyOn(Transaction, 'getTimestamp').mockImplementation(() => 1562066421);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Transaction', () => {
  const transaction = new Transaction();

  it('should be equal transaction', (done) => {
    const res = transaction.create(
      utxo,
      '030e8f1fd618a20464d8c597631da5042626c0776f65c0aefbda7eb2ff2af5d7d1',
      1,
      privateKey
    );

    expect(res).toEqual(Buffer.from(JSON.stringify(transactionToCompare)).toString('hex'));

    done();
  });
});