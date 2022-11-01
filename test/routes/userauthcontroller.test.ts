import userauthcontroller from '../../src/routes/userauthcontroller';

describe('Test User Auth Controller', function () {

    test('responds to /login', () => {
        const req = {
            body: {
                email: 'avw5331@gmail.com',
                password: 'anything'
            }
        };

        const res = { text: '',
            send: function(input) { this.text = input } 
        };

        const response = userauthcontroller.route('/login').post(req, res);
        
        expect(res.text).toEqual('hello world!');
    });

    test('responds to /register', () => {
        const req = { params: { name: 'Bob' }  };

        const res = { text: '',
            send: function(input) { this.text = input } 
        };
        userauthcontroller(req, res);
        
        expect(res.text).toEqual('hello Bob!');
    });

});