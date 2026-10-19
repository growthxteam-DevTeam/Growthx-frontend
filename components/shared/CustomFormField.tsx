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
import { useTranslations } from "next-intl";

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
  /** DATE only: "dropdown" adds month/year pickers so users can jump far back or ahead. */
  captionLayout?: "label" | "dropdown";
  /** DATE only: earliest / latest month the calendar can navigate to. */
  startMonth?: Date;
  endMonth?: Date;
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
  const tc = useTranslations("Common");

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
            className={`${props.variant} h-11 w-full text-16 placeholder:text-16 rounded-[5px] border-0 bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 ${
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
              className: "h-11 bg-input-background text-sm text-foreground focus:outline-none cursor-pointer",
            }}
            numberInputProps={{
              placeholder: props.placeholder,
              className:
                "flex h-11 w-full rounded-none border-0 bg-input-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none text-foreground",
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
          className={`${props.variant} border border-primary bg-input-background rounded-md placeholder:text-muted-foreground transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0`}
        />
      );

    case FormFieldType.SELECT:
      return (
        <div className="flex items-center rounded border border-primary relative transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary has-data-popup-open:border-primary has-data-popup-open:ring-1 has-data-popup-open:ring-primary">
          <Select
            defaultValue={props.defaultValue}
            onValueChange={field.onChange}
            value={field.value || null}
            items={options}
          >
            <SelectTrigger
              className={`${props.variant} w-full h-11! border-0 cursor-pointer text-16 placeholder:text-16 rounded-[5px] bg-muted text-muted-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-offset-0`}
              disabled={props.disabled}
            >
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>

            <SelectContent
              alignItemWithTrigger={false}
              sideOffset={4}
              className="z-100 text-16 border-primary text-foreground"
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
                className={`${props.variant ?? ""} h-11! w-full justify-start rounded-[5px] border-primary bg-muted pl-3 text-16 text-left font-normal text-foreground hover:bg-muted ${!field.value && "text-muted-foreground"}`}
              />
            }
          >
            {field.value ? (
              format(field.value, props.dateFormat || "PPP")
            ) : (
              <span>{props.placeholder || tc("pickDate")}</span>
            )}

            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={props.disabledDates}
              captionLayout={props.captionLayout}
              startMonth={props.startMonth}
              endMonth={props.endMonth}
              defaultMonth={field.value}
            />
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
  const tv = useTranslations("Validation");

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // Schemas carry message keys; anything else (e.g. zod defaults) is shown as-is.
  const errorMessage = error?.message ? (tv.has(error.message) ? tv(error.message) : String(error.message)) : undefined;

  return (
    <Field className="flex-1" data-invalid={!!error}>
      {props.fieldType !== FormFieldType.CHECKBOX && label && (
        <FieldLabel className="text-14 w-full max-w-70 font-medium text-description">{label}</FieldLabel>
      )}

      <RenderInput field={field} props={props} options={options} searchPlaceholder={searchPlaceholder} />

      {errorMessage && <FieldError className="text-red-500">{errorMessage}</FieldError>}
    </Field>
  );
};

export default CustomFormField;
