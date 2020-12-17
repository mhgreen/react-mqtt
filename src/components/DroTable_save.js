import React, { useEffect, useState } from 'react';
import { Table, Button, Flex, MenuButton } from '@fluentui/react-northstar';

const DroTable = ({ payload }) => {
  // const [message, setMessage] = useState([]);

  const axes = ['x', 'y', 'z', 'a'];  
  let json = '{"c":"-","b":"-","y":"-","z":"-","a":"-","x":"-"}';
  let optionsDisabled = true;
  let position = {};
  let DroPosition = [];

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

  const menuCell = {
    content: (
      <Flex gap="gap.smaller">
        <MenuButton
          onMenuItemClick={(e, { index }) => {
            console.log(subMenu[index].key);
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
    truncateContent: false,
  };

  const rowsContent = (selectedAxes, currentPosition) => {
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
        ...menuCell,
      });

      rowsArray.push({
        key: `${selectedAxes[index]}`,
        items: rowItems,
        onClick: () => handleRowClick(`${selectedAxes[index]}`),
      });
    });
    return rowsArray;
  };

  useEffect(() => {
    if (payload.topic) {
      console.log(`DroTest payload.topic: ${payload.topic}`);
      // setMessage(payload);
    }
  }, [payload]);

  // console.log(`DroTest payload: ${payload}`);
  console.log(`DroTest payload.message: ${payload.message}`);

  if (payload.message) {
    console.log('got json');
    optionsDisabled = false;
    json = payload.message;
  }

  function handleRowClick(index) {
    console.log(`${index} axis`);
  }

  position = JSON.parse(json);

  console.log(rowsContent(axes,position));

  DroPosition = rowsContent(axes,position);

  return (
    <Table
      variables={{
        cellContentOverflow: 'none',
      }}
      header={header}
      rows={DroPosition}
    />
  );
};

export default DroTable;
