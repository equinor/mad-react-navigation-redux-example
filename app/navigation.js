import { StackNavigator } from 'react-navigation';
import DefaultPage from './components/containers/DefaultPage';
import SearchMeetingRoomPage from './components/containers/SearchMeetingRoomPage';
import ScanLabelPage from './components/containers/ScanLabelPage';
import LookupLabelPage from './components/containers/LookupLabelPage';
import ReportMeetingRoomPage from './components/containers/ReportMeetingRoomPage';


const AppNavigator = StackNavigator({
  Default: { screen: DefaultPage },
  SearchMeetingRoom: { screen: SearchMeetingRoomPage },
  ScanLabel: { screen: ScanLabelPage },
  LookupLabel: { screen: LookupLabelPage },
  ReportMeetingRoom: { screen: ReportMeetingRoomPage },
});

export default AppNavigator;
