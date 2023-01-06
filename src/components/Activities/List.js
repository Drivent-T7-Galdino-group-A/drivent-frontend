import styled from 'styled-components';
import dayjs from 'dayjs';
import { CgEnter, CgCheckO, CgCloseO } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useCreateActivity from '../../hooks/api/useCreateActivity';

function filterActivitiesByLocalization({ activities, localizationId }) {
  const filteredActivities = activities?.filter((activity) => activity.Localization.id === localizationId);
  return filteredActivities;
}

function sortActivitiesByTime(activities) {
  activities?.sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));
}

function differenceBetweenDatesInHours({ startTime, endTime }) {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const difference = end.diff(start, 'hour', true);
  return difference;
}

export default function List({ activitiesFromDay, localizationId }) {
  const filteredActivities = filterActivitiesByLocalization({ activities: activitiesFromDay, localizationId });
  sortActivitiesByTime(filteredActivities);
  const { createActivity } = useCreateActivity();

  function bookActivity(activityId) {
    Swal.fire({
      title: 'Tem certeza que deseja se insecrever?',
      text: 'Você não poderá retirar a inscrição depois!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await createActivity({ activityId });
          toast('Inscrição confirmada!');
        } catch (error) {
          toast('A incrição falou, você possui outra atividade neste horário!');
        }
      }
    });
  }

  return (
    <Wrapper>
      {filteredActivities?.map((activity, index) => (
        <Lecture key={index} quantityOfHours={differenceBetweenDatesInHours(activity)}>
          <div>
            <div>{activity.name}</div>
            <div>
              {activity.startTime.slice(11, 16)} - {activity.endTime.slice(11, 16)}
            </div>
          </div>
          <CapacityBox capacity={activity.capacity}>
            {activity.capacity > 0 ? (
              <div onClick={() => bookActivity(activity.id)}>
                <div>
                  <CgEnter color="#078632" size="22px" />
                </div>
                <div>{activity.capacity} vagas</div>
              </div>
            ) : (
              <>
                <div>
                  <CgCloseO color="#CC6666" size="18px" />
                </div>
                <div>Esgotado</div>
              </>
            )}
          </CapacityBox>
        </Lecture>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  border: solid 1px #d7d7d7;
  border-right: none;
`;

const Lecture = styled.div`
  width: 90%;
  height: ${(props) => 90 * props.quantityOfHours - 10}px;
  margin: 10px 5%;
  padding: 10px 3%;
  background-color: #f1f1f1;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;

  font-family: 'Roboto';

  > div:nth-child(1) {
    font-size: 12px;
    line-height: 14px;
    color: #343434;

    > div:nth-child(1) {
      font-weight: 700;
    }

    > div:nth-child(2) {
      margin-top: 5px;
      font-weight: 400;
    }
  }

  > div:nth-child(2) {
    width: 65px;
    min-width: 65px;
    height: ${(props) => 90 * props.quantityOfHours - 30}px;
    border-left: 1px solid #cfcfcf;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const CapacityBox = styled.div`
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;
  padding-left: 8px;
  color: ${(props) => (props.capacity > 0 ? '#078632' : '#CC6666')};
  cursor: ${(props) => (props.capacity > 0 ? 'pointer' : '')};

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;
