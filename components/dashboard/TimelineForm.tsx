"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { TimelineFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "../ui/dialog";

type TimelineFormProps = {
  formTitle: string;
  id?: string;
  title?: string;
  date?: Date;
  description?: string;
  formButtonLabel: string;
};

const TimelineForm = ({
  formTitle,
  id,
  title,
  description,
  date,
  formButtonLabel,
}: TimelineFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof TimelineFormSchema>>({
    resolver: zodResolver(TimelineFormSchema),
    defaultValues: {
      title,
      date: new Date(),
      description,
    },
  });

  const onSubmit = async (data: z.infer<typeof TimelineFormSchema>) => {
    try {
      if (formButtonLabel.toLowerCase() === "add") {
        await axios.post("/api/timeline", data).then((res) => {
          form.reset();
          router.refresh();
        });
      }
      if (formButtonLabel.toLowerCase() === "edit") {
        await axios.put(`/api/timeline/${id}`, data).then((res) => {
          form.reset();
          router.refresh();
        });
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl pb-2 font-semibold">{formTitle}</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Learned something..."
                      {...field}
                      defaultValue={title}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick a date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date ? date : field.value}
                        onSelect={field.onChange}
                        disableNavigation={form.formState.isSubmitting}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write something..."
                      rows={8}
                      className="resize-none"
                      defaultValue={description}
                    />
                    {/* <ReactQuill
                      {...field}
                      modules={modules}
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      placeholder="Write something..."
                      className="w-full outline-none outline-offset-0 border-0"
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogClose asChild>
            <Button
              size={"lg"}
              disabled={form.formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              {formButtonLabel}
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default TimelineForm;
