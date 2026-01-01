import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type)
    onClickHandler && onClickHandler(type)
  }

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="neu-select-trigger">
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="neu-select-content">
        <SelectItem value="viewer" className="neu-select-item">
          can view
        </SelectItem>
        <SelectItem value="editor" className="neu-select-item">
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default UserTypeSelector
