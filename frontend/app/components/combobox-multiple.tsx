import { useState } from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./ui/combobox"
import { Input } from "./ui/input"
import { Avatar, AvatarBadge, AvatarImage } from "./ui/avatar"

export function ComboboxMultiple({ name, users }: any) {
  const anchor = useComboboxAnchor()
  const [value, setValue] = useState([])

  return (
    <>
      <Input
        type="hidden"
        name={name}
        value={value.map((item: any) => item.id).join(", ")}
      />
      <Combobox
        multiple
        autoHighlight
        items={users}
        defaultValue={[]}
        value={value}
        onValueChange={setValue}
      >
        <ComboboxChips ref={anchor} className="w-full max-w-xs">
          <ComboboxValue>
            {(values) => (
              <>
                {values.map((value: any) => (
                  <ComboboxChip key={value.id}>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarImage src={value.picture} />
                        <AvatarBadge
                          className={
                            value.online ? "bg-chart-2" : "bg-muted-foreground"
                          }
                        />
                      </Avatar>
                      <p>{value.username}</p>
                    </div>
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No usernames found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item}>
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarImage src={item.picture} />
                    <AvatarBadge
                      className={
                        item.online ? "bg-chart-2" : "bg-muted-foreground"
                      }
                    />
                  </Avatar>
                  <p>{item.username}</p>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  )
}
