import React from 'react';
import {
    Text,
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default () => {
    return <ScrollableTabView
        initialPage={1}
        renderTabBar={() => <DefaultTabBar />}
    >
        <Text tabLabel='Tab #1'>My</Text>
        <Text tabLabel='Tab #2'>favorite</Text>
        <Text tabLabel='Tab #3'>project</Text>
    </ScrollableTabView>;
}