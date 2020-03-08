pragma solidity >=0.4.24;

contract HelloWorld {

  address public owner;
  uint public counter;

  event Incremented(uint value, address sender);

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
    counter = 0;
  }

  function inc() public {
    counter += 1;

    emit Incremented(counter, msg.sender);
  }

  function setCounter(uint newValue) public restricted {
    counter = newValue;
  }

}
