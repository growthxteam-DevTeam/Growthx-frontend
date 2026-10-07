/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Control, FieldValues, Path, useController } from "react-hook-form";

import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";

import ComboboxField from "@/components/common/ComboboxField";
import { FrameworkT } from "@/types/global";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  COMBOBOX = "combobox",
  RADIO = "radio",
  DATE = "date",
}

interface CustomProps<T extends FieldValues = FieldValues> {
  type?: string;
  control: Control<T>;
  name: Path<T>;
  label?: React.ReactNode;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  render?: (field: unknown) => React.ReactNode;
  fieldType: FormFieldType;
  variant?: string;
  defaultValue?: string;
  readOnly?: boolean;
  disabledDates?: (date: Date) => boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  options?: FrameworkT[];
  searchPlaceholder?: string;
  isLoading?: boolean;
  onSearchChange?: (value: string) => void;
}

const RenderInput = <T extends FieldValues>({
  field,
  props,
  options,
  searchPlaceholder,
}: {
  field: any;
  props: CustomProps<T>;
  options?: FrameworkT[];
  searchPlaceholder?: string;
}) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded border border-primary relative transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          {props.leftIcon && <div className="absolute mb-1 left-3 cursor-pointer z-10">{props.leftIcon}</div>}

          <Input
            placeholder={props.placeholder}
            {...field}
            type={props.type}
            readOnly={props.readOnly}
            disabled={props.disabled}
            className={`${props.variant} h-11 w-full text-16 placeholder:text-16 rounded-[5px] border-0 bg-gray-50 text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 ${
              props.leftIcon ? "pl-10" : ""
            } ${props.rightIcon ? "pr-10" : ""}`}
            onChange={(e) => {
              field.onChange(e);
              props.onChange?.(e);
            }}
          />

          {props.rightIcon && <div className="absolute mb-1 right-3 cursor-pointer z-10">{props.rightIcon}</div>}
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <div
          className="phone-input-wrapper flex items-center rounded-md border border-primary overflow-hidden transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:border-r [&_.PhoneInputCountry]:border-primary"
          style={
            {
              "--PhoneInputCountrySelect-marginRight": "0",
              "--PhoneInputCountrySelectArrow-opacity": "1",
              "--PhoneInputCountrySelectArrow-color": "#374151",
            } as React.CSSProperties
          }
        >
          <PhoneInput
            international
            defaultCountry="NG"
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="flex w-full items-stretch"
            countrySelectProps={{
              className: "h-11 bg-input-background text-sm text-gray-900 focus:outline-none cursor-pointer",
            }}
            numberInputProps={{
              placeholder: props.placeholder,
              className:
                "flex h-11 w-full rounded-none border-0 bg-input-background px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none text-gray-900",
            }}
          />
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={props.placeholder}
          {...field}
          disabled={props.disabled}
          className={`${props.variant} border border-primary bg-input-background rounded-md placeholder:text-gray-500 transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0`}
        />
      );

    case FormFieldType.SELECT:
      return (
        <div className="flex items-center rounded border border-primary relative transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary has-data-popup-open:border-primary has-data-popup-open:ring-1 has-data-popup-open:ring-primary">
          <Select defaultValue={props.defaultValue} onValueChange={field.onChange} value={field.value || null}>
            <SelectTrigger
              className={`${props.variant} w-full h-11! border-0 cursor-pointer text-16 placeholder:text-16 rounded-[5px] bg-gray-50 text-gray-500 placeholder:text-gray-500 focus:ring-2 focus:ring-offset-0`}
              disabled={props.disabled}
            >
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>

            <SelectContent
              alignItemWithTrigger={false}
              sideOffset={4}
              className="z-100 text-16 border-primary text-gray-900"
            >
              {props.children}
            </SelectContent>
          </Select>
        </div>
      );

    case FormFieldType.COMBOBOX:
      return (
        <ComboboxField
          field={field}
          options={options}
          searchPlaceholder={searchPlaceholder}
          placeholder={props.placeholder}
          disabled={props.disabled}
          isLoading={props.isLoading}
          onSearchChange={props.onSearchChange}
        />
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />

          <label htmlFor={props.name} className="checkbox-label">
            {props.label}
          </label>
        </div>
      );

    case FormFieldType.DATE:
      return (
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className={`${props.variant ?? ""} h-11! w-full justify-start rounded-[5px] border-primary bg-gray-50 pl-3 text-16 text-left font-normal text-gray-900 hover:bg-gray-50 ${!field.value && "text-gray-500"}`}
              />
            }
          >
            {field.value ? (
              format(field.value, props.dateFormat || "PPP")
            ) : (
              <span>{props.placeholder || "Pick a date"}</span>
            )}

            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={props.disabledDates} />
          </PopoverContent>
        </Popover>
      );

    case FormFieldType.RADIO:
      return props.render ? props.render(field) : null;

    default:
      return null;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, name, label, options, searchPlaceholder } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Field className="flex-1" data-invalid={!!error}>
      {props.fieldType !== FormFieldType.CHECKBOX && label && (
        <FieldLabel className="text-14 w-full max-w-70 font-medium text-description">{label}</FieldLabel>
      )}

      <RenderInput field={field} props={props} options={options} searchPlaceholder={searchPlaceholder} />

      {error?.message && <FieldError className="text-red-500">{String(error.message)}</FieldError>}
    </Field>
  );
};

export default CustomFormField;
