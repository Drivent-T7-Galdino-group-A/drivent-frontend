import styled from 'styled-components';
import useActivitiesByDate from '../../hooks/api/useActivitiesByDate';
import useLocalizations from '../../hooks/api/useLocalizations';
import { StyledTypography } from '../TicketAndPayment/index';
import List from './List';

function formatDateToIsoString(date) {
  const formattedDate = `${date}T00:00:00.000Z`;
  return formattedDate;
}

export default function Schedule({ selectedDate }) {
  const formattedDate = formatDateToIsoString(selectedDate);
  
  const { activitiesByDate: activities } = useActivitiesByDate(formattedDate);
  const { localizations } = useLocalizations();

  return (
    <Wrapper >
      {localizations?.map((localization, index) => (
        <Localization
          key={index}
          quantityOfLocalizations={localizations?.length}
        >
          <StyledTypography variant="h6">{localization.name}</StyledTypography>
          <List
            activities={activities}
            localizationId={localization.id}
            selectedDate={selectedDate}
          />
        </Localization>
      ))
      }
    </Wrapper >
  );
}

const Wrapper = styled.div`
  height: 85%;
  margin: 60px 0;
  
  display: flex;

  & > div:last-child > div:last-child {
    border-right: solid 1px #D7D7D7;
  }
`;

const Localization = styled.div`
  width: ${props => props.quantityOfLocalizations ? Math.round(100 / props.quantityOfLocalizations) : 0}%;
  height: 80%;
`;
