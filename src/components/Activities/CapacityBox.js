import { CgEnter, CgCheckO, CgCloseO } from 'react-icons/cg';
import useCreateActivity from '../../hooks/api/useCreateActivity';
import useNumberOfEnrollmentsByActivity from '../../hooks/api/useNumberOfEnrollmentsByActivity';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

export default function CapacityBox({ activity, selectedDate }) {
  const [availableVacancies, setAvailableVacancies] = useState(activity.capacity);

  const { createActivity } = useCreateActivity();
  const { getNumberOfEnrollmentsByActivity } = useNumberOfEnrollmentsByActivity(activity.id);

  useEffect(async() => {
    const result = await getNumberOfEnrollmentsByActivity();
    const vacancies = activity.capacity - result.numberOfEnrollments;

    setAvailableVacancies(vacancies);
  }, [availableVacancies, selectedDate]);

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
          toast('A inscrição falhou, você possui outra atividade neste horário!');
        }
      }
    });
  }

  return (
    <Container capacity={activity.capacity}>
      {activity.capacity > 0 ? (
        <div onClick={() => bookActivity(activity.id)}>
          <div>
            <CgEnter color="#078632" size="22px" />
          </div>
          <div>{availableVacancies} vagas</div>
        </div>
      ) : (
        <>
          <div>
            <CgCloseO color="#CC6666" size="18px" />
          </div>
          <div>Esgotado</div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
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
