import main from './main';
import navigation from './navigation';
import searchMeetingRoom from './searchMeetingRoom';


export default function* rootSagas() {
  yield [
    main(),
    navigation(),
    searchMeetingRoom(),
  ];
}
