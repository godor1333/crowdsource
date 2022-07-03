export default {
  vxe: {
    error: {
      groupFixed:
        'Если включена группировка заголовков, зафиксированные столбцы должны быть установлены для группы.',
      groupMouseRange:
        'Группировка заголовков и "{{0}}" несовместимы. Одновременное использование может привести к ошибкам',
      scrollErrProp:
        'Параметр "{{0}}" не поддерживается, когда включена виртуальная прокрутка',
      scrollXNotGroup:
        'Горизонтальная виртуальная прокрутка не поддерживает группировку заголовков. Установите правильно параметр "scroll-x.gt", иначе возможны ошибки',
      errConflicts: 'Аргументы "{{0}}" и "{{1}}" несовместимы',
      unableInsert: 'Не получается вставить в указанное место',
      useErr:
        'Ошибка установки модуля "{{0}}". Возможно, неверный порядок - зависимые модули должны быть установлены до Table.',
      barUnableLink: 'Toolbar не может быть ассоциирован с таблицей',
      expandContent: 'Слот расширения строки должен быть "content"',
      reqModule: 'Требуется модуль "{{0}}"',
      reqProp:
        'Свойство "{{0}}" обязательное, его отсутствие может вызвать ошибку',
      emptyProp: 'Свойство "{{0}}" не может быть пустым',
      errProp: 'Параметр "{{0}}" не поддерживается. Возможно, "{{1}}"?',
      notFunc: 'метод "{{0}}" не существует',
      notSlot: 'слот "{{0}}" не существует',
      noTree: 'Таблица-дерево не поддерживает "{{0}}".',
      delFunc: 'Функция "{{0}}" - deprecated, используйте "{{1}}".',
      delProp: 'Свойство "{{0}}" - deprecated, используйте "{{1}}".',
      delEvent: 'Событие "{{0}}" - deprecated, используйте "{{1}}"',
      removeProp:
        'Свойство "{{0}}" - deprecated и не рекомендуется к использованию',
      errFormat:
        'Глобальный форматированный контент не должен быть определен через "VXETable.formats". Монтирование "formatter={{0}}" не рекомендуется',
      notType: 'Неподдерживаемый формат "{{0}}"',
      notExp: 'Браузер не поддерживает импорт/экспорт',
      impFields: 'Ошибка импорта. Проверьте правильность данных',
      treeNotImp: 'Таблица-дерево не поддерживает импорт'
    },
    table: {
      emptyText: 'Нет данных',
      allTitle: 'Выбрать всё / отменить',
      seqTitle: '#',
      confirmFilter: 'ОК',
      resetFilter: 'Сброс',
      allFilter: 'Все',
      sortAsc: 'По возрастанию',
      sortDesc: 'По убыванию',
      filter: 'Включить фильтрацию',
      impSuccess: 'Успешно импортировано {{0}} записей',
      expLoading: 'Производится экспорт...',
      expSuccess: 'Экспорт успешен!',
      expFilename: 'Export_{{0}}',
      expOriginFilename: 'Export_original_{{0}}',
      customTitle: 'Настройки столбца',
      customAll: 'Все',
      customConfirm: 'ОК',
      customRestore: 'Восстановить'
    },
    grid: {
      selectOneRecord: 'Выберите хотя бы одну запись!',
      deleteSelectRecord: 'Вы уверены, что хотите удалить выбранную запись?',
      removeSelectRecord: 'Вы уверены, что хотите удалить выбранную запись?',
      dataUnchanged: 'Данные удалены! ',
      delSuccess: 'Выбранная запись успешно удалена!',
      saveSuccess: 'Сохранено успешно!',
      operError: 'Произошла ошибка. Операция не выполнена'
    },
    pager: {
      goto: 'Перейти',
      pagesize: '{{0}}/стр.',
      total: 'Всего {{0}} записей',
      pageClassifier: '',
      prevPage: 'Назад',
      nextPage: 'Далее',
      prevJump: 'На предыдущую страницу',
      nextJump: 'На следующую страницу'
    },
    alert: {
      title: 'Сообщение'
    },
    button: {
      confirm: 'ОК',
      cancel: 'Отмена'
    },
    import: {
      modes: {
        covering: 'Обложка',
        insert: 'Добавить'
      },
      impTitle: 'Настройки импорта',
      impFile: 'Имя файла',
      impSelect: 'Выбор файла',
      impType: 'Тип файла',
      impOpts: 'Параметры импорта',
      impConfirm: 'Импорт'
    },
    export: {
      types: {
        csv: 'CSV (Comma separated) (*.csv)',
        html: 'Web Page (*.html)',
        xml: 'XML Data(*.xml)',
        txt: 'Text (Tab delimited) (*.txt)',
        xlsx: 'Excel Workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: 'Текущие данные',
        selected: 'Выбранные данные',
        all: 'Все данные'
      },
      expTitle: 'Настройки экспорта',
      expName: 'Имя файла',
      expNamePlaceholder: 'Введите имя файла',
      expSheetName: 'Заголовок',
      expSheetNamePlaceholder: 'Введите заголовок',
      expType: 'Тип файла',
      expMode: 'Данные для экспорта',
      expCurrentColumn: 'Все поля',
      expColumn: 'Выбранные поля',
      expOpts: 'Настройки экспорта',
      expOptHeader: 'Заголовок',
      expHeaderTitle: 'Включить заголовок в экспорт',
      expOptFooter: 'Нижний колонтитул',
      expFooterTitle: 'Включить нижний колонтитул в экспорт',
      expOptOriginal: 'Исходные данные',
      expOriginalTitle: 'Если это включено, поддерживается импорт',
      expPrint: 'Печать',
      expConfirm: 'Экспорт'
    },
    modal: {
      zoomIn: 'Увеличить',
      zoomOut: 'Уменьшить',
      close: 'Закрыть'
    },
    form: {
      folding: 'Свернуть',
      unfolding: 'Развернуть'
    },
    toolbar: {
      import: 'Импорт',
      export: 'Экспорт',
      print: 'Печать',
      refresh: 'Обновить',
      zoomIn: 'Увеличить',
      zoomOut: 'Уменьшить',
      custom: 'Настройки столбцов',
      customAll: 'Все',
      customConfirm: 'ОК',
      customRestore: 'Восстановить'
    },
    input: {
      date: {
        m1: 'Январь',
        m2: 'Февраль',
        m3: 'Март',
        m4: 'Апрель',
        m5: 'Май',
        m6: 'Июнь',
        m7: 'Июль',
        m8: 'Август',
        m9: 'Сентябрь',
        m10: 'Октябрь',
        m11: 'Ноябрь',
        m12: 'Декабрь',
        today: 'Сегодня',
        prevMonth: 'Предыдущий месяц',
        nextMonth: 'Следующий месяц',
        monthLabel: '{{0}}',
        dayLabel: '{{1}} {{0}}',
        labelFormat: {
          date: 'yyyy.MM.yy',
          datetime: 'dd.MM.yyyy HH:mm:ss',
          week: 'Неделя WW, yyyy',
          month: 'MM.yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: 'Неделя',
          w0: 'Вс',
          w1: 'Пн',
          w2: 'Вт',
          w3: 'Ср',
          w4: 'Чт',
          w5: 'Пт',
          w6: 'Сб'
        },
        months: {
          m0: 'Янв',
          m1: 'Фев',
          m2: 'Мар',
          m3: 'Апр',
          m4: 'Май',
          m5: 'Июн',
          m6: 'Июл',
          m7: 'Авг',
          m8: 'Сен',
          m9: 'Окт',
          m10: 'Ноя',
          m11: 'Дек'
        }
      }
    }
  }
}
