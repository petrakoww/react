import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";

import { createRent, getRents } from "./rentSlice";
import { getCar } from "../car/carSlice";
import { getUsers } from "../user/userSlice";

export function RentCreatePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const rent = useSelector((state) => state.rent);
  const car = useSelector((state) => state.car);
  const user = useSelector((state) => state.user);
  const { register, handleSubmit, control, watch } = useForm();
  const watchUserID = watch("userID");
  const watchStartDateTime = watch("startDateTime");
  const watchEndDateTime = watch("endDateTime");
  const rentDays = useMemo(() => {
    if (!watchStartDateTime || !watchEndDateTime) {
      return 0;
    }

    return (
      moment(watchEndDateTime).diff(moment(watchStartDateTime), "days") + 1
    );
  }, [watchStartDateTime, watchEndDateTime]);
  const price = rentDays ? car?.entity?.pricePerDay * rentDays : null;
  const discount = useMemo(() => {
    const currentDate = moment().startOf("day").hour(12);
    const rentsWithin60Days = rent.data?.filter((rent) => {
      // Get only selected user
      if (rent.userID !== Number(watchUserID)) {
        return false;
      }

      // Calculate how many days are passed since rent start
      const daysSince = currentDate.diff(moment(rent.startDateTime), "days");

      // Negative days are in the future -> don't include them
      // More than 60 days -> don't include them
      if (daysSince < 0 || daysSince > 60) {
        return false;
      }

      return true;
    });

    if (rentsWithin60Days.length > 3) {
      return 0.15;
    }

    if (rentDays > 10) {
      return 0.1;
    }

    if (rentDays > 5) {
      return 0.07;
    }

    if (rentDays > 3) {
      return 0.05;
    }

    return null;
  }, [rent.data, rentDays, watchUserID]);
  const finalPrice = useMemo(() => {
    if (!price) {
      return null;
    }

    if (!discount) {
      return price;
    }

    return price - price * discount;
  }, [price, discount]);
  const isLoading =
    car.status === "loading" || user.status === "loading";

  async function onSubmit(data) {
    const serializedData = {
      carID: Number(id),
      price: finalPrice,
      ...data,
    };

    if (serializedData.userID !== "") {
      serializedData.userID = Number(serializedData.userID);
    }

    await dispatch(
      createRent({
        rent: serializedData,
        car: {
          id,
          count: car.entity.count - 1,
        },
      })
    );
    history.push("/rents");
  }

  useEffect(() => {
    dispatch(getRents());
    dispatch(getCar(id));
    dispatch(getUsers());
  }, [id, dispatch]);

  if (isLoading) {
    return <h1>Зареждане...</h1>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>
        Наем на {car?.entity?.brand} {car?.entity?.model}
      </h1>

      <Form.Group controlId="userID">
        <Form.Label>Потребител</Form.Label>
        <Form.Control as="select" {...register("userID")}>
          <option value="" defaultValue>
            Изберте потребител
          </option>
          {user.data.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="startDateTime">
        <Form.Label>Начало</Form.Label>
        <div className="d-block">
          <Controller
            name="startDateTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                className="form-control"
                showTimeSelect
                dateFormat={"MMMM d, yyyy HH:mm"}
                timeFormat="HH:mm"
                minDate={new Date()}
                maxDate={watchEndDateTime}
              />
            )}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="endDateTime">
        <Form.Label>Край</Form.Label>
        <div className="d-block">
          <Controller
            name="endDateTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                className="form-control"
                showTimeSelect
                dateFormat={"MMMM d, yyyy HH:mm"}
                timeFormat="HH:mm"
                minDate={watchStartDateTime ?? new Date()}
              />
            )}
          />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Цена за ден: {car?.entity?.pricePerDay}</Form.Label>
      </Form.Group>

      {price && (
        <Form.Group>
          <Form.Label>
            Цена:{" "}
            {discount ? (
              <>
                <strike>{price}</strike> - {(discount * 100) | 0}% ={" "}
                {finalPrice}
              </>
            ) : (
              price
            )}
          </Form.Label>
        </Form.Group>
      )}

      <Button variant="warning" type="submit">
        Наеми
      </Button>
    </Form>
  );
}
