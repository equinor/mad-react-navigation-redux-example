import workflows from './workflows';
import navigation from './navigation';
import searchMeetingRoom from './searchMeetingRoom';


export default function* rootSagas() {
  yield [
    workflows(),
    navigation(),
    searchMeetingRoom(),
  ];
}
