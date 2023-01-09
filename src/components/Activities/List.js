import styled from 'styled-components';
import dayjs from 'dayjs';
import Lecture from './Lecture';

function filterActivitiesByLocalization({ activities, localizationId }) {
  const filteredActivities = activities?.filter((activity) => activity.Localization.id === localizationId);
  return filteredActivities;
}

function sortActivitiesByTime(activities) {
  activities?.sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));
}
export default function List({
  activities,
  localizationId,
  selectedDate,
  ticket
}) {
  const filteredActivities = filterActivitiesByLocalization({ activities, localizationId });
  sortActivitiesByTime(filteredActivities);

  return (
    <Wrapper>
      {filteredActivities?.map((activity, index) => (
        <Lecture
          key={index}
          activity={activity}
          ticket={ticket}
          selectedDate={selectedDate}
          activities={activities}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  border: solid 1px #d7d7d7;
  border-right: none;
`;
