import stockwatchlistcontroller from '../../src/routes/stockwatchlistcontroller';

describe('Test Stock Controller', function () {

    const emptyFunction = () => {};

    test('responds to /', async () => {
        const req = {  };

        const res = { text: '',
            send: function(input) { this.text = input } 
        };
        await stockwatchlistcontroller.route('/deleteStock').post(emptyFunction, req, res);
        
        // expect(res.text).toEqual('hello world!');
    });

    test('responds to /hello/:name', async () => {
        const req = { params: { name: 'Bob' }  };

        const res = { text: '',
            send: function(input) { this.text = input } 
        };
        await stockwatchlistcontroller.route('/deleteStock').post(emptyFunction, req, res);
        
        // expect(res.text).toEqual('hello Bob!');
    });

});