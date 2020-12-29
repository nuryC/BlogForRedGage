import React, { FC } from "react";
import { IonItem, IonLabel, IonInput, IonTextarea } from "@ionic/react";
import { Controller, Control, DeepMap, FieldError } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export interface InputProps {
  name: string;
  control?: Control;
  label?: string;
  component?: JSX.Element;
  errors?: DeepMap<Record<string, any>, FieldError>;
}

const Input: FC<InputProps> = ({
  name,
  control,
  component,
  label,
  errors
}) => {
  return (
    <>
      <IonItem>
        {label && (
          <IonLabel position="floating">{label}</IonLabel>
        )}
        <Controller
          render={({onChange}) => (
            (component ? <IonTextarea clearOnEdit={false} onIonChange={onChange} /> : <IonInput onIonChange={onChange} />)  ?? <IonInput onIonChange={onChange} />
          )}
          control={control}
          name={name}
          rules={{
            required: "This is a required field"
          }}
        />
      </IonItem>
      <ErrorMessage
        errors={errors}
        name={name}
        as={<div style={{ color: "red" }} />}
      />
    </>
  );
};

export default Input;