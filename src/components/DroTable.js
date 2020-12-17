import React, { useEffect, useState } from 'react';
import { Table, Button, Flex, MenuButton } from '@fluentui/react-northstar';

const DroTable = ({ payload }) => {
  const [droContent, setDroContent] = useState([]);
  const [selectedAxis, setSelectedAxis] = useState('');
  const [command, setCommand] = useState('');

  const header = {
    key: 'header',
    items: [
      {
        content: 'Axis',
        key: 'Axis',
      },
      {
        content: 'Position',
        key: 'Position',
      },
      {
        content: 'Machine Coordinates',
        key: 'machineCoordinates',
      },
      {
        key: 'action',
      },
    ],
  };

  useEffect(() => {

    const axes = ['x', 'y', 'z', 'a'];
    let defaultJson = '{"c":"-","b":"-","y":"-","z":"-","a":"-","x":"-"}';
    let position = {};
    
    const subMenu = [
      {
        content: 'Zero',
        key: 'zeroAxis',
      },
      {
        content: 'Other',
        key: 'otherAxis',
      },
    ];

    function handleRowClick(index) {
      setSelectedAxis(index);
      // console.log(`${index} is the selected axis`);
    }
  
    const rowsContent = (selectedAxes, currentPosition, optionsDisabled) => {
      let rowsArray = [];
      selectedAxes.forEach((item, index, array) => {
        let { [`${selectedAxes[index]}`]: pos } = currentPosition;
        let rowItems = [];
  
        rowItems.push({
          content: `${selectedAxes[index]}`.toUpperCase(),
          key: `${selectedAxes[index]}Label`,
        });
        rowItems.push({
          content: pos,
          key: `${selectedAxes[index]}Pos`,
        });
        rowItems.push({
          content: pos,
          key: `${selectedAxes[index]}Machine`,
        });
        rowItems.push({
          key: 'options',
          content: (
            <Flex gap="gap.smaller">
              <MenuButton
                onMenuItemClick={(e, { index }) => {
                  setCommand(subMenu[index].key);
                  // console.log(subMenu[index].key);
                  e.stopPropagation();
                }}
                trigger={
                  <Button size="small" disabled={optionsDisabled} content="Options" />
                }
                menu={subMenu}
                on="click"
              />
            </Flex>
          ),
        });
  
        rowsArray.push({
          key: `${selectedAxes[index]}`,
          items: rowItems,
          onClick: () => handleRowClick(`${selectedAxes[index]}`),
        });
      });
      return rowsArray;
    };

    if (payload.topic) {
      // console.log(`DroTest payload.topic: ${payload.topic}`);
      console.log(`DroTest payload.message: ${payload.message}`);
      position = JSON.parse(payload.message);
      setDroContent(rowsContent(axes, position, false));
    } else {
      console.log('no message yet');
      position = JSON.parse(defaultJson);
      setDroContent(rowsContent(axes, position, true));
    }
  }, [payload]);

  useEffect(() => {
    if (selectedAxis && command) {
      console.log(`Axis ${selectedAxis.toUpperCase()} with command ${command} inside UseEffect`);
      setCommand('');
    } else {
      // console.log('no axis and command yet');
    }
  }, [selectedAxis, command]);

  return (
    <Table
      variables={{
        cellContentOverflow: 'none',
      }}
      header={header}
      rows={droContent}
    />
  );
};

export default DroTable;
