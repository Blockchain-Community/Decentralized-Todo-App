const { assert } = require('chai')

const Todo = artifacts.require('./Todo.sol')

// chai is used for tesing
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Todo', () => {
    let todo

    // before method is used to initiate the contract
    before(async () => {
        todo = await Todo.deployed()
    })

    // describe gives the title for what we are doing
    describe('deployment', async () => {
        // it method checks the specific task
        it('deploys successfully', async () => {
            // check if the address is valid
            const address = await todo.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('item', async () => {
        let itemCount, result;

        before(async () => {
            result = await todo.setNewItem(
                'item title',
                'item description',
                'current time and date'
            )
            itemCount = await todo.itemCount()
        })

        it('has user count and adds item', async () => {
            // success
            assert.equal(itemCount, 1)
            const event = result.logs[0].args

            assert.equal(event._title, 'item title', 'Title is correct')
            assert.equal(event._description, 'item description', 'Item description is correct')
            assert.equal(event._createdAt, 'current time and date', 'Date & Time is correct')

            // failure: item must have a title
            await todo.setNewItem('', 'Item description', 'Now').should.be.rejected;

            // failure: item must have a description
            await todo.setNewItem('Item title', '', 'Now').should.be.rejected;

            // failure: item must have a date
            await todo.setNewItem('Item title', 'Item description', '').should.be.rejected;
        })

        it('lists item', async () => {
            const item = await todo.todoItems(itemCount)
            
            assert.equal(item.title, 'item title', 'Title is correct')
            assert.equal(item.description, 'item description', 'Item description is correct')
            assert.equal(item.createdAt, 'current time and date', 'Date & Time is correct')
        })
    })
})
