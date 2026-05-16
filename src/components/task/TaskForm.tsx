import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Priority, Category } from '../../interfaces';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Lütfen bir görev başlığı girin.');
      return;
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      completed: false,
    });

    toast.success('Görev başarıyla eklendi!');

    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('work');
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 ' +
    'bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 ' +
    'placeholder:text-stone-400 dark:placeholder:text-stone-500 ' +
    'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ' +
    'transition-all duration-200 text-sm font-medium';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-2xl p-5 shadow-sm transition-colors duration-300"
    >
      <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
        Yeni Görev
      </p>

      <div className="flex flex-col gap-3">

        {/* Başlık */}
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ne yapmak istiyorsun?"
          className={inputClass}
        />

        {/* Açıklama */}
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Görev hakkında detaylar... (isteğe bağlı)"
          rows={2}
          className={inputClass + ' resize-none'}
        />

        <div className="flex flex-col sm:flex-row gap-3">

          {/* Kategori */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label
              htmlFor="category"
              className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest"
            >
              Kategori
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClass + ' cursor-pointer'}
            >
              <option value="work">İş</option>
              <option value="personal">Kişisel</option>
              <option value="health">Sağlık</option>
              <option value="education">Eğitim</option>
              <option value="other">Diğer</option>
            </select>
          </div>

          {/* Öncelik */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label
              htmlFor="priority"
              className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest"
            >
              Öncelik
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className={inputClass + ' cursor-pointer'}
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

        </div>

        {/* Gönder */}
        <button
          type="submit"
          className="self-end flex items-center gap-2 bg-amber-600 hover:bg-amber-500 active:bg-amber-700
                     text-white px-6 py-3 rounded-xl font-semibold text-sm
                     transition-all duration-200 shadow-sm shadow-amber-500/20
                     hover:shadow-md hover:shadow-amber-500/25 hover:-translate-y-0.5 active:translate-y-0
                     cursor-pointer"
        >
          <FiPlus className="w-4 h-4" strokeWidth={2.5} />
          Görev Ekle
        </button>

      </div>
    </form>
  );
};
