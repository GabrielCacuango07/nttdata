import { getURL } from './enviroment';

describe('enviroment', () => {
  it('enviroment', () => {

    let enviroment = getURL("middleware")
    expect(enviroment).toMatch(/^(http|https):\/\/[a-z]*.[a-z]*:[0-9]*$/)
    
  });
});